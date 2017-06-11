import cloneDeep from 'lodash/cloneDeep';

export default class DirectiveNode {

    // basic
    tag;
    children;


    // data
    classes; // same to class
    style;
    attrs;
    props;
    domProps;
    on;
    nativeOn;
    directives;
    scopedSlots;
    slot;

    key;
    ref;

    // Helper
    parent;

    //
    pos;
    type;

    constructor({
        tag,
        children,

        classes,
        style,
        attrs,
        props,
        domProps,
        on,
        nativeOn,
        directives,
        scopedSlots,
        slot,

        key,
        ref,
    }, pos, parent) {
        this.tag = tag;

        this.classes = classes;
        this.style = style;
        this.attrs = attrs;
        this.props = props;
        this.domProps = domProps;
        this.on = on;
        this.nativeOn = nativeOn;
        this.directives = directives;
        this.scopedSlots = scopedSlots;
        this.slot = slot;

        this.key = key;
        this.ref = ref;

        this.children = children;

        this.parent = parent;
        this.pos = pos;


        switch (tag) {
            case "_system-grid_":
                this.type = 'grid';
                break;
            case "_system-row_":
                this.type = 'row';
                break;
            case "_system-column_":
                this.type = 'column';
                break;
            case "_system-layer_":
                this.type = 'layer';
                break;
        }
    }

    getLinealDescentList() {
        let des = [];

        let node = this;

        while (node) {
            des.unshift(node);
            node = node.parent;
        }

        return des;
    }


    findByLocation(_loc) {
        if( _loc.indexOf(this.pos) !== 0 ){
            throw new Error(`Invalid location. loc:${_loc}, current node location:${this.pos}.`);
        }

        var myPosTokens = this.pos.split('.');
        var posTokens = _loc.split('.');
        posTokens = posTokens.splice(myPosTokens.length - 1);

        if (posTokens.length === 1) return this;

        let node = this;

        for (let i = 1; i < posTokens.length; i++) {
            if (!node.children) return null;

            node = node.children[parseInt(posTokens[i])];

            if (!node) return null;
        }

        return node;
    }

    static importFromJSON({
        tag,
        children,

        classes,
        style,
        attrs,
        props,
        domProps,
        on,
        nativeOn,
        directives,
        scopedSlots,
        slot,

        key,
        ref,
    }, pos = '0', parent = null) {

        let node = new DirectiveNode({
            tag: tag,

            classes: cloneDeep(classes),
            style: cloneDeep(style),
            attrs: cloneDeep(attrs),
            props: cloneDeep(props),
            domProps: cloneDeep(domProps),
            on: cloneDeep(on),
            nativeOn: cloneDeep(nativeOn),
            directives: cloneDeep(directives),
            scopedSlots: cloneDeep(scopedSlots),
            slot: cloneDeep(slot),

            key: cloneDeep(key),
            ref: cloneDeep(ref),
        }, pos, parent);

        if (children) {
            node.children = children.map((json, i) => DirectiveNode.importFromJSON(json, [pos, i].join('.'), node));
        }

        return node;
    }

    exportToJSON() {
        let json = {
            tag: this.tag,

            classes: cloneDeep(this.classes),
            style: cloneDeep(this.style),
            attrs: cloneDeep(this.attrs),
            props: cloneDeep(this.props),
            domProps: cloneDeep(this.domProps),
            on: cloneDeep(this.on),
            nativeOn: cloneDeep(this.nativeOn),
            directives: cloneDeep(this.directives),
            scopedSlots: cloneDeep(this.scopedSlots),
            slot: cloneDeep(this.slot),

            key: cloneDeep(this.key),
            ref: cloneDeep(this.ref),
        };

        if (this.children) {
            json.children = this.children.map((childNode) => childNode.exportToJSON());
        }

        return json;
    }
}
