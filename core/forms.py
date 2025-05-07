from django import forms

class BlockForm(forms.Form):
    required_css_class = 'required'
    id = forms.CharField(label='id', max_length=255, required=True)
    name = forms.CharField(label='name', required=False)
    order = forms.CharField(label='order', required=False, initial='645')
    author = forms.CharField(label='author', required=False)
    created_at = forms.CharField(label='created_at', required=False)
    description = forms.CharField(label='description', required=False)

        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""
