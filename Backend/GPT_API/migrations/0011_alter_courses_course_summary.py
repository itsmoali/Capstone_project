# Generated by Django 3.2.1 on 2024-03-23 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0010_alter_courses_course_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='course_summary',
            field=models.CharField(default='This is a course', max_length=10000),
        ),
    ]
