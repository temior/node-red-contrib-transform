# node-red-contrib-transform

## Use the power of [JSONata](https://jsonata.org/) to easily transform [Node-RED](https://nodered.org/) messages. 

### Installation:

```
npm install node-red-contrib-transform
```

### Usage:

Just enter the template as a valid [JSONata](https://jsonata.org/) expression and enjoy the transformation. 

#### Template example:

```javascript
{
    "topic": topic & "_ceil",
    "payload": $ceil(payload)
}
```

#### Multiple outputs/messages supported as well:

```javascript
[
    [
        {
            "payload": "first out of output 1"
        },
        {
            "payload": "second out of output 1"
        }
    ],
    {
        "payload": "only message from output 2"
    }
]
```
