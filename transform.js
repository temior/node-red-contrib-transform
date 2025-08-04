module.exports = function (RED) {
    function isMessage(value) {
        return typeof value === 'object' || value === undefined;
    }

    function isOutputPacket(value) {
        return Array.isArray(value) ? value.every(isMessage) : isMessage(value);
    }

    function isFlowPacket(value) {
        return Array.isArray(value) ? value.every(isOutputPacket) : isMessage(value);
    }

    function build(template, node) {
        return RED.util.prepareJSONataExpression(template, node);
    }

    function TransformNode(config) {
        RED.nodes.createNode(this, config);

        const expression = build(config.template, this);

        this.on('input', (message, send, done) => {
            RED.util.evaluateJSONataExpression(expression, message, (error, result) => {
                if (error) {
                    done(error);
                } else if (!isFlowPacket(result)) {
                    done(new Error('The transformation result has an invalid structure.'));
                } else {
                    send(result);
                    done();
                }
            });
        });
    }

    RED.nodes.registerType("transform", TransformNode);
}