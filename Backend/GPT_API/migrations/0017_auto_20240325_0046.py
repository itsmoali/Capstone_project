# Generated by Django 3.2.1 on 2024-03-25 00:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('GPT_API', '0016_alter_courses_course_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courses',
            name='user',
        ),
        migrations.CreateModel(
            name='UserCourses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('module_completions', models.JSONField(default=dict)),
                ('courses', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='GPT_API.courses')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
