import ssl
import nltk

# Disable SSL certificate verification
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download the 'punkt' tokenizer data
nltk.download('punkt')
