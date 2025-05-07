import json
from datetime import datetime
from django.shortcuts import render
from core.forms import BlockForm

def builder(request):
    json_data = None

    if request.method == 'POST':
        form = BlockForm(request.POST)
        if form.is_valid():
            json_data = {
                "id": form.cleaned_data['id'],
                "name": form.cleaned_data['name'],
                "order": form.cleaned_data['order'],
                "author": form.cleaned_data['author'],
                "created_at": form.cleaned_data['created_at'] or str(datetime.today().date()),
                "description": form.cleaned_data['description'],
            }
            
            dynamic_fields = {}
            for key, value in request.POST.items():
                if key.startswith('dynamic_') and value:
                    field_name = key.replace('dynamic_', '')
                    dynamic_fields[field_name] = value
            
            if dynamic_fields:
                json_data['dynamic_fields'] = dynamic_fields
            
            json_data = json.dumps(json_data, indent=4, ensure_ascii=False)
    else:
        form = BlockForm()

    return render(request, 'core/builder.html', {
        'form': form,
        'json_data': json_data,
    })
