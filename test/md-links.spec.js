import { extentFile, mdLinks } from '../index.js';


describe('extentFile', () => {
  it("debería retornar un objeto", () => {
    const path = "test.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Object);
  });
});


describe('mdLinks', () => {
  it("debería retornar una promesa", () => {
    const path = "test.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

