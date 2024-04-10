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

}