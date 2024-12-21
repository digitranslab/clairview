resource "kubernetes_service" "clairviewcrm_redis" {
  metadata {
    name      = "${var.clairviewcrm_app_name}-redis"
    namespace = kubernetes_namespace.clairviewcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.clairviewcrm_app_name}-redis"
    }
    session_affinity = "ClientIP"
    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}
