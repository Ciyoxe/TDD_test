// проверка, является ли строка валидным идентификатором для c++
export function is_identifier(ident: string) {
    return ident.match(/^[a-zA-Z_]+[a-zA-Z0-9_]*$/) !== null;
}