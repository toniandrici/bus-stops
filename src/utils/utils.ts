
type Time = {
  time: string;
};
type Stop = {
  stop: string;
  children?: Time[];
};

type Line = {
  line: number;
  children?: Stop[];
};

function timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function buildTree(data: any[]): {
  tree: Line[];
  stops: string[];
} {
  const linesMap: Record<number, Line> = {};
  const allStops: string[] = [];

  data.forEach((item) => {
    const lineId = item.line;
    const stopName = item.stop;

    if (!linesMap[lineId]) {
      linesMap[lineId] = { line: lineId, children: [] };
    }

    const line = linesMap[lineId];
    let stop = line.children?.find((stop) => stop.stop === stopName);

    if (!stop) {
      stop = { stop: stopName, children: [] };
      allStops.push(stopName);
      line.children?.push(stop);
    }

    stop.children?.push({ time: item.time });
  });

  // Sort the "Time" objects within each "Stop" by their time values
  Object.values(linesMap).forEach((line) => {
    line.children?.forEach((stop) => {
      stop.children?.sort((a, b) => {
        // Convert time strings to Date objects for comparison
        const timeA = timeStringToMinutes(a.time);
        const timeB = timeStringToMinutes(b.time);
        return timeA - timeB;
      });
    });
  });

  return {
    tree: Object.values(linesMap),
    stops: allStops.sort((a: string, b: string) => b.localeCompare(a))
  }
} 
