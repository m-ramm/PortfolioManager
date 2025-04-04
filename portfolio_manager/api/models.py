# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


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


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


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
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # user = models.ForeignKey('Users', models.DO_NOTHING)
    portfolio_name = models.CharField(max_length=50)

    class Meta:
        managed = True
        db_table = 'portfolio'


class PortfolioSecurity(models.Model):
    portfolio = models.OneToOneField(Portfolio, models.DO_NOTHING, primary_key=True)  # The composite primary key (portfolio_id, security_id) found, that is not supported. The first column is selected.
    security = models.ForeignKey('Security', models.DO_NOTHING)
    portfolio_security_volume = models.IntegerField(default=0)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        managed = True
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
    password = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'users'

class UserFavouriteSecurities(models.Model):
    # user = models.ForeignKey('Users', models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    security = models.OneToOneField('Security', on_delete=models.DO_NOTHING, null=True)
    # user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    # security = models.ForeignKey('Security', models.DO_NOTHING, null=True)
        
    class Meta:
        # Change following to false again?
        managed = True
        db_table = 'user_favourite_securities'
        unique_together = (('user', 'security'),)