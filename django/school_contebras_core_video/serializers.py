from rest_framework import serializers
from django.conf import settings
from school_contebras_core_video.models import Video

class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer para vídeos.
    Expõe dados tratados com URLs completas para thumbnail e mídia de vídeo.
    """
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    slug = serializers.CharField()
    published_at = serializers.DateTimeField()

    # campos calculados a partir do model
    views = serializers.IntegerField(source="num_views")
    likes = serializers.IntegerField(source="num_likes")

    # relacionamentos
    tags = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    # campos construídos dinamicamente
    thumbnail = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        """Retorna URL absoluta da thumbnail do vídeo."""
        assets_url = settings.ASSETS_URL or ""
        return f"{assets_url}/{obj.thumbnail}"

    def get_video_url(self, obj):
        """Retorna URL absoluta da mídia de vídeo."""
        assets_url = settings.ASSETS_URL or ""
        return f"{assets_url}{obj.video_media.video_path}"

    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "description",
            "slug",
            "published_at",
            "views",
            "likes",
            "tags",
            "thumbnail",
            "video_url",
        ]
