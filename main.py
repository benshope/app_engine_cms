import json

self.response.headers['Content-Type'] = 'application/json'   
obj = {
    'success': 'some var', 
    'payload': 'some var',
  } 
self.response.out.write(json.dumps(obj))