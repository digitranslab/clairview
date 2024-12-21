resource "kubernetes_service" "clairviewcrm_server" {
  metadata {
    name      = "${var.clairviewcrm_app_name}-server"
    namespace = kubernetes_namespace.clairviewcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.clairviewcrm_app_name}-server"
    }
    session_affinity = "ClientIP"
    port {
      name        = "http-tcp"
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}
