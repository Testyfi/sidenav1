export interface question {
  questionstring: string;
  questionimage: string;
  questiontype: number;

  optionastring: string;

  optionbstring: string;

  optioncstring: string;

  optiondstring: string;

  optionaimage: string;
  optionbimage: string;
  optioncimage: string;
  optiondimage: string;
  currectanswer: string;
  solutionstring: string;
  solutionimage: string;
}
export interface testtype {
  Name: string;
  Start: string;
  StartAt: string;
  Difficulty: string;
  Topics: string;
  Duration: string;
  Prize: string;
}
export const Tests = [
  {
    Name: 'Rank Booster 1',
    Start: '2023/12/04/14/06/00',
    StartAt: '04/12/2023  14:06:00',
    Difficulty: 'Jee Advanced',
    Topics:
      'Chemistry : Isomerism,Cordination compounds,alkylhalide, hydrocarbon,Ionic Equilibrium,Solution,Iupac Nomenclature,S-block;Physics : Sound,SHM,Thermal Conductivity,Ideal Gas,Geometrical Optics,Wave on String,Mechanics; Mathematics: Binomial Theorem,Permuatation Combination,Function,Trignometric function',
    Duration: '180',
    Prize: '1 rank-1000;2 rank-500;3 rank-100',
  },
  {
    Name: 'Rank Booster 2',
    Start: '2023/12/03/14/00/00',
    StartAt: '03/12/2023  14:00:00',
    Difficulty: 'Jee Advanced',
    Topics:
      'Chemistry : Isomerism,Cordination compounds,alkylhalide, hydrocarbon,Ionic Equilibrium,Solution,Iupac Nomenclature,S-block;Physics : Sound,SHM,Thermal Conductivity,Ideal Gas,Geometrical Optics,Wave on String,Mechanics; Mathematics: Binomial Theorem,Permuatation Combination,Function,Trignometric function',
    Duration: '180',
    Prize: '1 rank-1000;2 rank-500;3 rank-100',
  },
];
export const questiondata = {
  questionstring: '',
  questionimage: '',
  questiontype: 3,

  optionastring: '',

  optionbstring: '',

  optioncstring: '',

  optiondstring: '',

  optionaimage: '',
  optionbimage: '',
  optioncimage: '',
  optiondimage: '',
  currectanswer: '',
  solutionstring: '',

  solutionimage: '',
};
