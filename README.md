# siudi7-bro

## configuration

Each `event` item contains the event name to listen to and the corresponding scene and page indexes.

Example:

```json
{
  "udp": {
    "host": "192.168.1.60",
    "port": 41234
  },
  "events": [
    {
      "name": "first",
      "scene": "01",
      "page": "00"
    }, {
      "name": "second",
      "scene": "02",
      "page": "00"
    }, {
      "name": "third",
      "scene": "03",
      "page": "00"
    }
  ]
}
```
