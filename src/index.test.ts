import {
    is_identifier,
    is_type,
    make_singleton,
    make_pool,
    make_factory,
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

test("is_type valid", () => {
    expect(is_type("int")).toBe(true);
    expect(is_type("float")).toBe(true);
    expect(is_type("string")).toBe(true);
    expect(is_type("bool")).toBe(true);
    expect(is_type("void")).toBe(true);
    expect(is_type("vec<float>")).toBe(true);
    expect(is_type("vec<_a>")).toBe(true);
    expect(is_type("int*")).toBe(true);
    expect(is_type("int**")).toBe(true);
    expect(is_type("const int&")).toBe(true);
    expect(is_type("const int*")).toBe(true);
    expect(is_type("const int**")).toBe(true);
});

test("is_type invalid", () => {
    expect(is_type("")).toBe(false);
    expect(is_type("int*int")).toBe(false);
    expect(is_type("int*int**")).toBe(false);
    expect(is_type("int*int*int")).toBe(false);
    expect(is_type("int<<")).toBe(false);
    expect(is_type("int>>")).toBe(false);
    expect(is_type("??_int>>int")).toBe(false);
});

test("make_singleton", () => {
    expect(()=> make_singleton("!@#$Z%")).toThrow("Invalid class name");
    expect(make_singleton("hello")).toBe(
`class hello {
    private:
        hello* instance = nullptr;
    public:
        static hello* get_instance() {
            if (instance == nullptr) {
                instance = new hello();
            }
            return instance;
        }
}`);
});

test("make_pool", () => {
    expect(()=> make_pool("!@#$Z%", "hello")).toThrow("Invalid pool class name");
    expect(()=> make_pool("hello", "!@#$Z%")).toThrow("Invalid object class name");
    expect(make_pool("pool", "object")).toBe(
`class pool {
    private:
        std::vector<object*> pool;
    public:
        object* get() {
            if (pool.empty()) {
                return new object();
            }
            object* obj = pool.back();
            pool.pop_back();
            return obj;
        }
        void put(object* obj) {
            pool.push_back(obj);
        }
}`);
});

test("make_factory", () => {
    expect(()=> make_factory("!@#$Z%", "object")).toThrow("Invalid factory class name");
    expect(()=> make_factory("factory", "!@#$Z%")).toThrow("Invalid object type");
    expect(make_factory("factory", "object")).toBe(
`class factory {
    public:
        object* create() {
            return new object();
        }
}`);
});