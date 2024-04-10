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