const { sharonStrategy, ribeyesStrategy, stripStrategy, defaultStrategy } = require('../strategyUtil');

describe('Module strategyUtil', () => {
  const fakeThickness = 2.0;
  const fakeMoisture = 0.65;
  const fakeTFactor = 0.5;
  const fakeMFactor = 0.5;

  it('Method sharonStrategy', () => {
    const res = sharonStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 20,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method ribeyesStrategy', () => {
    const res = ribeyesStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 30,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method stripStrategy', () => {
    const res = stripStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 50,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method defaultStrategy', () => {
    const res = defaultStrategy(fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 100,
    });
  });
});
