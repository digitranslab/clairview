######################
# Required Variables #
######################
variable "clairviewcrm_pgdb_admin_password" {
  type        = string
  description = "ClairviewCRM password for postgres database."
  sensitive   = true
}

variable "clairviewcrm_app_hostname" {
  type        = string
  description = "The protocol, DNS fully qualified hostname, and port used to access ClairviewCRM in your environment. Ex: https://crm.example.com:443"
}

######################
# Optional Variables #
######################
variable "clairviewcrm_app_name" {
  type        = string
  default     = "clairviewcrm"
  description = "A friendly name prefix to use for every component deployed."
}

variable "clairviewcrm_server_image" {
  type        = string
  default     = "clairviewcrm/clairview:latest"
  description = "ClairviewCRM server image for the server deployment. This defaults to latest. This value is also used for the workers image."
}

variable "clairviewcrm_db_image" {
  type        = string
  default     = "twentycrm/twenty-postgres-spilo:latest"
  description = "ClairviewCRM image for database deployment. This defaults to latest."
}

variable "clairviewcrm_server_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the ClairviewCRM server deployment. This defaults to 1."
}

variable "clairviewcrm_worker_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the ClairviewCRM worker deployment. This defaults to 1."
}

variable "clairviewcrm_db_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the ClairviewCRM database deployment. This defaults to 1."
}

variable "clairviewcrm_server_data_mount_path" {
  type        = string
  default     = "/app/packages/clairview-server/.local-storage"
  description = "ClairviewCRM mount path for servers application data. Defaults to '/app/packages/clairview-server/.local-storage'."
}

variable "clairviewcrm_db_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "clairviewcrm_server_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "clairviewcrm_db_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for database persistent volume."
}

variable "clairviewcrm_db_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for database persistent volume claim."
}

variable "clairviewcrm_server_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "clairviewcrm_server_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for server persistent volume claim."
}

variable "clairviewcrm_namespace" {
  type        = string
  default     = "clairviewcrm"
  description = "Namespace for all ClairviewCRM resources"
}

variable "clairviewcrm_redis_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the ClairviewCRM Redis deployment. This defaults to 1."
}

variable "clairviewcrm_redis_image" {
  type        = string
  default     = "redis/redis-stack-server:latest"
  description = "ClairviewCRM image for Redis deployment. This defaults to latest."
}

variable "clairviewcrm_docker_data_mount_path" {
  type        = string
  default     = "/app/docker-data"
  description = "ClairviewCRM mount path for servers application data. Defaults to '/app/docker-data'."
}

variable "clairviewcrm_docker_data_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "clairviewcrm_docker_data_pv_capacity" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "clairviewcrm_docker_data_pvc_requests" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity reservation for server persistent volume claim."
}
