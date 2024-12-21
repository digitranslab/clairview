resource "kubernetes_persistent_volume_claim" "db" {
  metadata {
    name      = "${var.clairviewcrm_app_name}-db-pvc"
    namespace = kubernetes_namespace.clairviewcrm.metadata.0.name
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.clairviewcrm_db_pvc_requests
      }
    }
    volume_name = kubernetes_persistent_volume.db.metadata.0.name
  }
}
