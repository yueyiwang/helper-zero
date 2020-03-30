from django.apps import AppConfig

class HelperZeroConfig(AppConfig):
    name = 'backend.helper_zero'

    def ready(self):
    	from backend.helper_zero.scheduler.scheduler import scheduler
    	scheduler.register_scheduler()