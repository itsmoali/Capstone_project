# Generated by Django 3.2.1 on 2024-03-29 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0021_alter_courses_course_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='course_skills',
            field=models.CharField(default='No Skills', max_length=1000),
        ),
    ]
