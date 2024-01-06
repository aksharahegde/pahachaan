const STATUS_COLORS: any = {
  active: "blue",
  abandoned: "red",
  wip: "yellow",
  completed: "green",
};

const STATUS_LEGEND = Object.keys(STATUS_COLORS).map((key) => ({
  name: key,
  color: STATUS_COLORS[key],
}));

export { STATUS_COLORS, STATUS_LEGEND };
