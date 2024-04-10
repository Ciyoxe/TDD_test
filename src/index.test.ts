import {
    is_identifier
} from "./patterns";

test("is_identifier valid", () => {
    expect(is_identifier("hello")).toBe(true);
    expect(is_identifier("hello_world")).toBe(true);
    expect(is_identifier("hello123")).toBe(true);
    expect(is_identifier("hello_123")).toBe(true);
    expect(is_identifier("___")).toBe(true);
    expect(is_identifier("_hello123_world")).toBe(true);
});

test ("is_identifier invalid", () => {
    expect(is_identifier("")).toBe(false);
    expect(is_identifier("1hello")).toBe(false);
    expect(is_identifier("hello-123")).toBe(false);
    expect(is_identifier("hello_123-")).toBe(false);
});

test("is_identifier special symbols", () => {
    expect(is_identifier("")).toBe(false);
    expect(is_identifier("&hello")).toBe(false);
    expect(is_identifier("he@#%")).toBe(false);
    expect(is_identifier("helloXSS!")).toBe(false);
});