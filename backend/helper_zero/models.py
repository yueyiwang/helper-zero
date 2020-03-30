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
  url = models.CharField(max_length=120, null=True)
  address = models.CharField(max_length=120)
  description = models.CharField(max_length=120, null=True)
  phone = models.CharField(max_length=120)
  org_type = models.CharField(max_length=120)
  email = models.EmailField()
  is_dropoff = models.BooleanField()
  is_pickup = models.BooleanField()
  is_mail = models.BooleanField()
  dropoff_instructions = models.TextField(blank=True, null=True)
  pickup_instructions = models.TextField(blank=True, null=True)
  mail_instructions = models.TextField(blank=True, null=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)
  auth_user_id=models.CharField(max_length=120)
  pickup_times = models.TextField(blank=True, null=True)
  dropoff_times = models.TextField(blank=True, null=True)

  def _str_(self):
    return self.name

class DonationRequest(models.Model):
  org = models.ForeignKey(
          'Organization',
          related_name="donation_requests",
          on_delete=models.CASCADE,
        )

  item = models.CharField(max_length=120)
  item_type = models.CharField(max_length=120)
  amount_requested = models.PositiveIntegerField()
  amount_received = models.PositiveIntegerField()

  def _str_(self):
    return self.name

class Donation(models.Model):
  org = models.ForeignKey(
          'Organization',
          related_name="donations",
          on_delete=models.CASCADE,
        )
  name = models.CharField(max_length=120)
  phone = models.CharField(max_length=120)
  email = models.EmailField(null=True)
  status = models.CharField(max_length=120)
  item = models.CharField(max_length=120)
  amount = models.PositiveIntegerField()
  created_at = models.DateTimeField()
  city = models.CharField(max_length=120)
  pickup_address = models.TextField(blank=True, null=True)
  delivery_type = models.CharField(max_length=120)
  pickup_or_dropoff_times = models.TextField()

  def _str_(self):
    return self.name

class HashToDonation(models.Model):
  donation = models.ForeignKey(
              'Donation',
              related_name="donation",
              on_delete=models.CASCADE,
            )
  hash_key = models.CharField(max_length=120)

  def _str_(self):
    return self.name