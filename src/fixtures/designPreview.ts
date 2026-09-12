// Layout fixtures only. These are not the sourced release catalog.
export type PreviewEntity = {
  id: string;
  type: 'Endeavor' | 'Stage' | 'Role' | 'Knowledge' | 'Tool';
  title: string;
  shortTitle: string;
  description: string;
  contribution: string;
  related: { id: string; label: string }[];
};

export const SONG_ID = 'endeavor:song-release';
export const MIX_ID = 'stage:song-mixing';
export const ROLE_ID = 'role:mixing-engineer';
export const SOUND_ID = 'knowledge:sound-waves';
export const TOOL_ID = 'tool:digital-audio-workstation';

export const previewEntities: PreviewEntity[] = [
  {
    id: SONG_ID, type: 'Endeavor', title: 'Produce & release a song', shortTitle: 'A song',
    description: 'Follow a song from an idea to a recording someone can hear. Look closer at one part of the process: the mix.',
    contribution: 'A way to explore the people, knowledge and tools that come together around a shared piece of work.',
    related: [{ id: MIX_ID, label: 'includes a stage' }, { id: ROLE_ID, label: 'a role in the mix' }, { id: SOUND_ID, label: 'a concept behind the sound' }],
  },
  {
    id: MIX_ID, type: 'Stage', title: 'Mix the recording', shortTitle: 'Mixing',
    description: 'Explore how separate recorded parts can be shaped into a piece that feels connected.',
    contribution: 'In this example, a mixing engineer adjusts the balance and placement of tracks with a digital audio workstation.',
    related: [{ id: ROLE_ID, label: 'a contribution from' }, { id: SOUND_ID, label: 'draws on' }, { id: TOOL_ID, label: 'uses' }],
  },
  {
    id: ROLE_ID, type: 'Role', title: 'Mixing engineer', shortTitle: 'Mixing engineer',
    description: 'A person working with the recorded parts of a song, listening for how they fit together.',
    contribution: 'Within the mixing stage, this role shapes the relative levels and placement of recorded sounds.',
    related: [{ id: MIX_ID, label: 'contributes during' }, { id: SOUND_ID, label: 'draws on in this context' }, { id: TOOL_ID, label: 'uses in this context' }],
  },
  {
    id: SOUND_ID, type: 'Knowledge', title: 'Sound waves', shortTitle: 'Sound waves',
    description: 'A starting point for exploring how sound moves, and what changes when we hear a different pitch or loudness.',
    contribution: 'Follow this concept into the work of recording and mixing a song, then back out to the people using it.',
    related: [{ id: MIX_ID, label: 'helps explain the work' }, { id: ROLE_ID, label: 'used by in this example' }, { id: TOOL_ID, label: 'represented in' }],
  },
  {
    id: TOOL_ID, type: 'Tool', title: 'Digital audio workstation', shortTitle: 'Audio workstation',
    description: 'A software workspace for bringing recordings together and working with sound.',
    contribution: 'In the mixing stage, it gives the engineer a place to arrange and adjust the recorded tracks.',
    related: [{ id: MIX_ID, label: 'used during' }, { id: ROLE_ID, label: 'used by in this context' }, { id: SOUND_ID, label: 'works with representations of' }],
  },
];

export function getPreviewEntity(id: string): PreviewEntity | undefined {
  return previewEntities.find((entity) => entity.id === id);
}
