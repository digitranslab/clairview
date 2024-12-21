resource "kubernetes_service" "clairviewcrm_db" {
  metadata {
    name      = "${var.clairviewcrm_app_name}-db"
    namespace = kubernetes_namespace.clairviewcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.clairviewcrm_app_name}-db"
    }
    session_affinity = "ClientIP"
    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}
