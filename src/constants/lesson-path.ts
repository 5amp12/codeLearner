export type LessonStatus = 'completed' | 'active' | 'locked';
export type LessonNodeKind = 'lesson' | 'chest' | 'trophy';

export type LessonNodeData = {
  id: string;
  kind: LessonNodeKind;
  status: LessonStatus;
};

export type PathUnit = {
  id: string;
  unitLabel: string;
  title: string;
  colorIndex: number;
  nodes: LessonNodeData[];
};

export type UnitColor = {
  base: string;
  edge: string;
  soft: string;
};

export const UNIT_COLORS: UnitColor[] = [
  { base: '#58CC02', edge: '#46A302', soft: '#D7FFB8' },
  { base: '#1CB0F6', edge: '#1899D6', soft: '#CBF0FF' },
  { base: '#CE82FF', edge: '#A568D9', soft: '#F0DBFF' },
  { base: '#FF9600', edge: '#E08600', soft: '#FFE2B8' },
];

export const LOCKED_COLOR: UnitColor = { base: '#E5E5E5', edge: '#C7C7C7', soft: '#F3F3F3' };

function buildUnitNodes(count: number, completed: number, hasActive: boolean): LessonNodeData[] {
  const nodes: LessonNodeData[] = Array.from({ length: count }, (_, index) => {
    const kind: LessonNodeKind = (index + 1) % 4 === 0 ? 'chest' : 'lesson';
    let status: LessonStatus = 'locked';
    if (index < completed) status = 'completed';
    else if (hasActive && index === completed) status = 'active';
    return { id: `n${index}`, kind, status };
  });

  nodes.push({ id: 'trophy', kind: 'trophy', status: completed >= count ? 'completed' : 'locked' });
  return nodes;
}

export const PATH_UNITS: PathUnit[] = [
  {
    id: 'unit-1',
    unitLabel: 'SECTION 1, UNIT 1',
    title: 'Basics',
    colorIndex: 0,
    nodes: buildUnitNodes(7, 0, true),
  },
  {
    id: 'unit-2',
    unitLabel: 'SECTION 1, UNIT 2',
    title: 'Greetings',
    colorIndex: 1,
    nodes: buildUnitNodes(6, 0, false),
  },
  {
    id: 'unit-3',
    unitLabel: 'SECTION 1, UNIT 3',
    title: 'Food & Drink',
    colorIndex: 2,
    nodes: buildUnitNodes(6, 0, false),
  },
  {
    id: 'unit-4',
    unitLabel: 'SECTION 1, UNIT 4',
    title: 'Travel',
    colorIndex: 3,
    nodes: buildUnitNodes(5, 0, false),
  },
];

export const ZIGZAG_STEPS = [0, 1, 1.7, 1, 0, -1, -1.7, -1];
export const ZIGZAG_STEP_WIDTH = 48;
