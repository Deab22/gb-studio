import l10n from "../helpers/l10n";

export const id = "EVENT_ACTOR_PUSH";

export const fields = [
  {
    key: "continue",
    label: l10n("FIELD_SLIDE_UNTIL_COLLISION"),
    type: "checkbox",
    defaultValue: false
  }
];

export const compile = (input, helpers) => {
  const { entityType, entity, setActiveActor, actorPush } = helpers;
  if (entityType === "actor" && entity.id !== undefined) {
    setActiveActor(entity.id);
    actorPush(input.continue);
  }
};
