resource "kubernetes_namespace" "clairviewcrm" {
  metadata {
    annotations = {
      name = var.clairviewcrm_namespace
    }

    name = var.clairviewcrm_namespace
  }
}
