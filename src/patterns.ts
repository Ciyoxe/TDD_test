// проверка, является ли строка валидным идентификатором для c++
export function is_identifier(ident: string) {
    return ident.match(/^[a-zA-Z_]+[a-zA-Z0-9_]*$/) !== null;
}

// проверка, является ли строка валидным типом для c++
export function is_type(type: string) {
    return type.match(
        /^(const)?\s*[a-zA-Z_]+[a-zA-Z0-9_]*(<[a-zA-Z0-9_]+>)?(\*|&)*$/
    ) !== null;
}

export function make_singleton(classname: string) {
    if (!is_identifier(classname)) {
        throw new Error("Invalid class name");
    }
    return (
`class ${classname} {
    private:
        ${classname}* instance = nullptr;
    public:
        static ${classname}* get_instance() {
            if (instance == nullptr) {
                instance = new ${classname}();
            }
            return instance;
        }
}`);
}

export function make_pool(pool_class: string, object_class: string) {
    if (!is_identifier(pool_class)) {
        throw new Error("Invalid pool class name");
    }
    if (!is_identifier(object_class)) {
        throw new Error("Invalid object class name");
    }
    return (
`class ${pool_class} {
    private:
        std::vector<${object_class}*> pool;
    public:
        ${object_class}* get() {
            if (pool.empty()) {
                return new ${object_class}();
            }
            ${object_class}* obj = pool.back();
            pool.pop_back();
            return obj;
        }
        void put(${object_class}* obj) {
            pool.push_back(obj);
        }
}`);
}

export function make_factory(factory_class: string, object_type: string) {

}