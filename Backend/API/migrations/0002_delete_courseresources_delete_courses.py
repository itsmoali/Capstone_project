# Generated by Django 4.2.5 on 2023-10-29 21:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CourseResources',
        ),
        migrations.DeleteModel(
            name='Courses',
        ),
    ]