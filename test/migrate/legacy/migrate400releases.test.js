import {
  migrateFrom400r1To400r2Event,
  migrateFrom400r2To400r3Event,
  migrateFrom400r3To400r4Event,
} from "../../../src/lib/project/migration/legacy/migrateLegacyProjectVersions";
import initElectronL10N from "../../../src/lib/lang/initElectronL10N";

beforeAll(async () => {
  await initElectronL10N();
});

test("should migrate 3.3.0 and below Engine Field Update slider values", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "slider",
        value: 794,
      },
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "number",
        value: 794,
      },
    },
  });
});

test("should migrate 3.3.0 and below Engine Field Update select values", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "topdown_grid",
      value: {
        type: "select",
        value: 16,
      },
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "topdown_grid",
      value: {
        type: "number",
        value: 16,
      },
    },
  });
});

test("should keep 3.3.0 and below Engine Field Update variable values unchanged", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "fade_style",
      value: {
        type: "variable",
        value: "L0",
      },
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "fade_style",
      value: {
        type: "variable",
        value: "L0",
      },
    },
  });
});

test("shouldn't add value to 3.3.0 and below Engine Field Update variable values that have empty values", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
    },
  });
  expect(migrateFrom400r1To400r2Event(oldEvent).args.value).toBeUndefined();
});

test("should keep 3.3.0 and below Engine Field Update variable values that have invalid values", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "slider",
        value: "",
      },
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "slider",
        value: "",
      },
    },
  });
});

test("should keep Engine Field Update script values", () => {
  const oldEvent = {
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "add",
        valueA: {
          type: "number",
          value: 1792,
        },
        valueB: {
          type: "number",
          value: 55,
        },
      },
    },
  };
  expect(migrateFrom400r1To400r2Event(oldEvent)).toMatchObject({
    command: "EVENT_ENGINE_FIELD_SET",
    args: {
      engineFieldKey: "plat_walk_vel",
      value: {
        type: "add",
        valueA: {
          type: "number",
          value: 1792,
        },
        valueB: {
          type: "number",
          value: 55,
        },
      },
    },
  });
});

test("should migrate x/y coordinate from replace tile event", () => {
  const oldEvent = {
    command: "EVENT_REPLACE_TILE_XY",
    args: {
      x: 14,
      y: 7,
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      tileIndex: {
        type: "number",
        value: 1,
      },
    },
  };
  expect(migrateFrom400r2To400r3Event(oldEvent)).toMatchObject({
    command: "EVENT_REPLACE_TILE_XY",
    args: {
      x: {
        type: "number",
        value: 14,
      },
      y: {
        type: "number",
        value: 7,
      },
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      tileIndex: {
        type: "number",
        value: 1,
      },
    },
  });
});

test("should migrate x/y coordinate from replace tile sequence event", () => {
  const oldEvent = {
    command: "EVENT_REPLACE_TILE_XY_SEQUENCE",
    args: {
      x: 4,
      y: 11,
      tileIndex: {
        type: "number",
        value: 0,
      },
      variable: "L2",
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      frames: {
        type: "number",
        value: 4,
      },
    },
  };
  expect(migrateFrom400r2To400r3Event(oldEvent)).toMatchObject({
    command: "EVENT_REPLACE_TILE_XY_SEQUENCE",
    args: {
      x: {
        type: "number",
        value: 4,
      },
      y: {
        type: "number",
        value: 11,
      },
      tileIndex: {
        type: "number",
        value: 0,
      },
      variable: "L2",
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      frames: {
        type: "number",
        value: 4,
      },
    },
  });
});

test("should migrate x/y coordinate values as 0 in replace tile event if invalid", () => {
  const oldEvent = {
    command: "EVENT_REPLACE_TILE_XY",
    args: {
      x: "",
      y: undefined,
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      tileIndex: {
        type: "number",
        value: 1,
      },
    },
  };
  expect(migrateFrom400r2To400r3Event(oldEvent)).toMatchObject({
    command: "EVENT_REPLACE_TILE_XY",
    args: {
      x: {
        type: "number",
        value: 0,
      },
      y: {
        type: "number",
        value: 0,
      },
      tilesetId: "d7042527-d20e-486d-93e6-66b9397df510",
      tileIndex: {
        type: "number",
        value: 1,
      },
    },
  });
});

test("should migrate flag values to number if string", () => {
  const oldEvent = {
    command: "EVENT_IF_FLAGS_COMPARE",
    args: {
      variable: "L0",
      flag: "10",
    },
    children: {
      true: [{ command: "MOCK_TRUE" }],
      false: [{ command: "MOCK_FALSE" }],
    },
  };
  expect(migrateFrom400r3To400r4Event(oldEvent)).toMatchObject({
    command: "EVENT_IF_FLAGS_COMPARE",
    args: {
      variable: "L0",
      flag: 10,
    },
    children: {
      true: [{ command: "MOCK_TRUE" }],
      false: [{ command: "MOCK_FALSE" }],
    },
  });
});

test("should keep the flag value as a number if number", () => {
  const oldEvent = {
    command: "EVENT_IF_FLAGS_COMPARE",
    args: {
      variable: "L0",
      flag: 10,
    },
    children: {
      true: [{ command: "MOCK_TRUE" }],
      false: [{ command: "MOCK_FALSE" }],
    },
  };
  expect(migrateFrom400r3To400r4Event(oldEvent)).toMatchObject({
    command: "EVENT_IF_FLAGS_COMPARE",
    args: {
      variable: "L0",
      flag: 10,
    },
    children: {
      true: [{ command: "MOCK_TRUE" }],
      false: [{ command: "MOCK_FALSE" }],
    },
  });
});
