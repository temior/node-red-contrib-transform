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

    function transform(message, expression) {
        const result = RED.util.evaluateJSONataExpression(expression, message);

        if (!isFlowPacket(result)) {
            throw new Error('The transformation result has an invalid structure.');
        }

        return result;
    }

    function TransformNode(config) {
        RED.nodes.createNode(this, config);

        const expression = build(config.template, this);

        this.on('input', (message, send, done) => {
            let error, result;

            try {
                result = transform(message, expression);
            } catch (e) {
                error = e.message;
            }

            if (error) {
                done(error);
            } else {
                send(result);
                done();
            }
        });
    }

    RED.nodes.registerType("transform", TransformNode);
}