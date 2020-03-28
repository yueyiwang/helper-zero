from django.db import models

class Organization(models.Model):
  name = models.CharField(max_length=120, null=True)
  phone = models.CharField(max_length=120, null=True)
  org_type = models.CharField(max_length=120, null=True)
  email = models.EmailField(null=True)
  is_dropoff_only = models.BooleanField(default=True)
  instructions = models.TextField(blank=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  def _str_(self):
    return self.name

class DonationRequest(models.Model):
  org_id = models.ForeignKey(
            'Organization',
             related_name="donation_requests",
              on_delete=models.CASCADE,
          )

  item_type = models.CharField(max_length=120)
  amount_requested = models.PositiveIntegerField()
  amount_received = models.PositiveIntegerField(default=0)

  def _str_(self):
    return self.name

class Donation(models.Model):
  org_id = models.ForeignKey(
            'Organization',
            on_delete=models.CASCADE,
           )
  status = models.CharField(max_length=120, null=True)
  item_type = models.CharField(max_length=120, null=True)
  amount = models.PositiveIntegerField()
  created_at = models.DateTimeField()
  donation_time_start = models.DateTimeField()
  donation_time_end = models.DateTimeField(null=True)

  def _str_(self):
    return self.name
