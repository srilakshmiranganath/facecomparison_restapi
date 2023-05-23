from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import MultipleFileUploadSerializer, UploadSerializer
from django.core.files.storage import FileSystemStorage
from .models import File
from face_recognition import compare_faces, face_encodings, load_image_file
import os

class CompareViewSet(ViewSet):
    serializer_class = UploadSerializer

    def compare(self, request):
        if request.method == 'POST':
            file_uploaded = request.FILES.get('compare')
            file_uploaded_path = os.path.join('comparison/', file_uploaded.name)

            fs = FileSystemStorage(location='comparison/')
            fs.save(file_uploaded.name, file_uploaded)

            compare_encodings = face_encodings(load_image_file(file_uploaded_path))
            if len(compare_encodings) >0:
                compare_encoding = compare_encodings[0]
            else:
                return Response("File not encoded")

            saved_images_folder = 'media/'
            saved_images_files = os.listdir(saved_images_folder)

            for image_file in saved_images_files:
                image_path = os.path.join(saved_images_folder, image_file)
                image_encoding = face_encodings(load_image_file(image_path))[0]


                result = compare_faces([image_encoding], compare_encoding)
                    #result = False

                if result:
                    res = "Match found"
                    return Response(res)
                    # else:
                    #     print("not found")
                    
            res = "Match not found"
            return Response(res)

class UploadViewSet(ViewSet):
    serializer_class = MultipleFileUploadSerializer
    
    def create(self, request):
        if request.method == 'POST':
            files_uploaded = request.FILES.getlist('file')
            file_models = []

            for file_uploaded in files_uploaded:
                file_model = File()

                fs = FileSystemStorage(location='media/')
                saved_file = fs.save(file_uploaded.name, file_uploaded)

                file_model.file = saved_file

                file_models.append(file_model)

            File.objects.bulk_create(file_models)

            response = "POST API and you have uploaded and saved a file"
            return Response(response)
        respones = "Invalid request method"
        return Response(response)
    