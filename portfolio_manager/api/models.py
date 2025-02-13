# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class DailyPrice(models.Model):
    dp_id = models.BigAutoField(primary_key=True)
    security = models.ForeignKey('Security', models.DO_NOTHING)
    dp_date = models.DateField()
    dp_created_date = models.DateField(blank=True, null=True)
    dp_last_updated = models.DateField(blank=True, null=True)
    dp_open = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    dp_high = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    dp_low = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    dp_close = models.DecimalField(max_digits=6, decimal_places=2)
    dp_adj_close = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    dp_volume = models.DecimalField(max_digits=20, decimal_places=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'daily_price'
        unique_together = (('dp_date', 'security'),)


class Exchange(models.Model):
    exchange_id = models.AutoField(primary_key=True)
    exchange_name = models.CharField(max_length=50)
    exchange_full_name = models.CharField(max_length=50, blank=True, null=True)
    exchange_currency = models.CharField(max_length=3, blank=True, null=True)
    exchange_created_date = models.DateField(blank=True, null=True)
    exchange_last_updated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exchange'


class Portfolio(models.Model):
    portfolio_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    portfolio_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'portfolio'


class PortfolioSecurity(models.Model):
    portfolio = models.OneToOneField(Portfolio, models.DO_NOTHING, primary_key=True)  # The composite primary key (portfolio_id, security_id) found, that is not supported. The first column is selected.
    security = models.ForeignKey('Security', models.DO_NOTHING)
    portfolio_security_volume = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'portfolio_security'
        unique_together = (('portfolio', 'security'),)


class Security(models.Model):
    security_id = models.AutoField(primary_key=True)
    exchange = models.ForeignKey(Exchange, models.DO_NOTHING)
    security_ticker = models.CharField(max_length=10)
    type = models.ForeignKey('Type', models.DO_NOTHING, blank=True, null=True)
    security_name = models.CharField(max_length=50)
    security_sector = models.CharField(max_length=50, blank=True, null=True)
    security_industry = models.CharField(max_length=50, blank=True, null=True)
    security_created_date = models.DateField(blank=True, null=True)
    security_last_updated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'security'


class Type(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=25)

    class Meta:
        managed = False
        db_table = 'type'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_username = models.CharField(max_length=50, blank=True, null=True)
    user_email = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
