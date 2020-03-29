from django.db import models

class User(models.Model):
  name = models.CharField(max_length=120)
  phone = models.CharField(max_length=120)
  email = models.EmailField(null=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  def _str_(self):
    return self.name

class Organization(models.Model):
  name = models.CharField(max_length=120)
  phone = models.CharField(max_length=120)
  org_type = models.CharField(max_length=120)
  email = models.EmailField()
  is_dropoff_only = models.BooleanField(default=True)
  instructions = models.TextField(blank=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  def _str_(self):
    return self.name

class DonationRequest(models.Model):
  org = models.ForeignKey(
          'Organization',
          related_name="donation_requests",
          on_delete=models.CASCADE,
        )

  item_type = models.CharField(max_length=120)
  amount_requested = models.PositiveIntegerField()
  amount_received = models.PositiveIntegerField()

  def _str_(self):
    return self.name

class Donation(models.Model):
  org = models.ForeignKey(
          'Organization',
          on_delete=models.CASCADE,
        )
  name = models.CharField(max_length=120)
  phone = models.CharField(max_length=120)
  email = models.EmailField(null=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  status = models.CharField(max_length=120)
  item_type = models.CharField(max_length=120)
  amount = models.PositiveIntegerField()
  created_at = models.DateTimeField()
  donation_time_start = models.DateTimeField()
  donation_time_end = models.DateTimeField()

  def _str_(self):
    return self.name
