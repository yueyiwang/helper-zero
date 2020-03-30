from apscheduler.schedulers.background import BackgroundScheduler

class Scheduler:
	def register_scheduler(self):
		self.scheduler = BackgroundScheduler()
		self.scheduler.start()

	def add_job_with_interval(self, fn, interval):
		self.scheduler.add_job(fn, 'interval', seconds=interval)

	def add_job_with_datetime(self, fn, date, params):
		self.scheduler.add_job(fn, 'date', run_date=date, args=[params])

scheduler = Scheduler()
