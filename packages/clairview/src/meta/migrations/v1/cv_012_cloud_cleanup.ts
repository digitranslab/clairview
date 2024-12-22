const up = async (knex) => {
  const tablesToDrop = [
    'cv_plugins',
    'nc_disabled_models_for_role',
    'cv_shared_views',
    'cv_projects_users',
    'nc_roles',
    'cv_hooks',
    'nc_cron',
    'cv_acl',
    'cv_models',
    'nc_relations',
    'nc_routes',
    'nc_resolvers',
    'nc_loaders',
    'nc_rpc',
    'nc_audit',
    'cv_migrations',
    'cv_projects',
  ];

  // check if table exist and remove if exist
  for (const table of tablesToDrop) {
    const tableExist = await knex.schema.hasTable(table);
    if (tableExist) {
      await knex.schema.dropTable(table);
    }
  }
};

const down = async (_knex) => {};

export { up, down };
