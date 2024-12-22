import { Readable } from 'stream';
import path from 'path';
import iconv from 'iconv-lite';
import { Injectable, Logger } from '@nestjs/common';
import moment from 'moment';
import type { Job } from 'bull';
import { type DataExportJobData } from '~/interface/Jobs';
import { elapsedTime, initTime } from '~/modules/jobs/helpers';
import { ExportService } from '~/modules/jobs/jobs/export-import/export.service';
import { Model, PresignedUrl, View } from '~/models';
import { CvError } from '~/helpers/catchError';
import CvPluginMgrv2 from '~/helpers/CvPluginMgrv2';

function getViewTitle(view: View) {
  return view?.is_default ? 'Default View' : view?.title;
}

@Injectable()
export class DataExportProcessor {
  private logger = new Logger(DataExportProcessor.name);

  constructor(private readonly exportService: ExportService) {}

  async job(job: Job<DataExportJobData>) {
    const {
      context,
      options,
      modelId,
      viewId,
      user: _user,
      exportAs,
      ncSiteUrl,
    } = job.data;

    if (exportAs !== 'csv') CvError.notImplemented(`Export as ${exportAs}`);

    const hrTime = initTime();

    const model = await Model.get(context, modelId);

    if (!model) CvError.tableNotFound(modelId);

    const view = await View.get(context, viewId);

    if (!view) CvError.viewNotFound(viewId);

    // date time as containing folder YYYY-MM-DD/HH
    const dateFolder = moment().format('YYYY-MM-DD/HH');

    const storageAdapter = await CvPluginMgrv2.storageAdapter();

    const destPath = `nc/uploads/data-export/${dateFolder}/${modelId}/${
      model.title
    } (${getViewTitle(view)}) - ${Date.now()}.csv`;

    let url = null;

    try {
      const dataStream = new Readable({
        read() {},
      });

      dataStream.setEncoding('utf8');

      const encodedStream =
        options?.encoding &&
        options.encoding !== 'utf-8' &&
        iconv.encodingExists(options.encoding)
          ? dataStream
              .pipe(iconv.decodeStream('utf-8'))
              .pipe(iconv.encodeStream(options?.encoding || 'utf-8'))
          : dataStream;

      let error = null;

      const uploadFilePromise = (storageAdapter as any)
        .fileCreateByStream(destPath, encodedStream)
        .catch((e) => {
          this.logger.error(e);
          error = e;
        });

      this.exportService
        .streamModelDataAsCsv(context, {
          dataStream,
          linkStream: null,
          baseId: model.base_id,
          modelId: model.id,
          viewId: view.id,
          ncSiteUrl: ncSiteUrl,
          delimiter: options?.delimiter,
        })
        .catch((e) => {
          this.logger.debug(e);
          dataStream.push(null);
          error = e;
        });

      url = await uploadFilePromise;

      // if url is not defined, it is local attachment
      if (!url) {
        url = await PresignedUrl.getSignedUrl({
          pathOrUrl: path.join(destPath.replace('nc/uploads/', '')),
          filename: `${model.title} (${getViewTitle(view)}).csv`,
          expireSeconds: 3 * 60 * 60, // 3 hours
          preview: false,
          mimetype: 'text/csv',
          encoding: options?.encoding || 'utf-8',
        });
      } else {
        url = await PresignedUrl.getSignedUrl({
          pathOrUrl: url,
          filename: `${model.title} (${getViewTitle(view)}).csv`,
          expireSeconds: 3 * 60 * 60, // 3 hours
          preview: false,
          mimetype: 'text/csv',
          encoding: options?.encoding || 'utf-8',
        });
      }

      if (error) {
        throw error;
      }

      elapsedTime(
        hrTime,
        `exported data for model ${modelId} view ${viewId} as ${exportAs}`,
        'exportData',
      );
    } catch (e) {
      throw {
        data: {
          extension_id: options?.extension_id,
          title: `${model.title} (${getViewTitle(view)})`,
        },
        message: e.message,
      };
    }

    return {
      timestamp: new Date(),
      extension_id: options?.extension_id,
      type: exportAs,
      title: `${model.title} (${getViewTitle(view)})`,
      url,
    };
  }
}
