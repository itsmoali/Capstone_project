# Generated by Django 4.2.5 on 2023-09-27 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseResources',
            fields=[
                ('course_resource_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('course_resource_name', models.CharField(max_length=100)),
                ('course_resource_description', models.CharField(max_length=1000)),
                ('course_resource_link', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('course_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=100, unique=True)),
                ('course_description', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('username', models.CharField(max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
