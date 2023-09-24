export interface BookProps {
  mastrId: string;
  listSeCd: string;
  title: string;
  pictrWritrNm: string;
  sntncWritrNm: string;
  mainGenreCd: string;
  mainGenreCdNm: string;
  orginlNationCd: string;
  orginlNationCdNm: string;
  imageDownloadUrl: string;
}

export interface IResult {
  listSeCd: string;
  pageNo: Number;
  resultMessage: string;
  resultState: string;
  totalcount: Number;
  viewItemCnt: Number;
}
export interface IItem {
  mastrId: string;
  listSeCd: string;
  listSeCdNm: string;
  prdctNm: string;
  title: string;
  subtitl: string | null;
  edtn: string | null;
  pictrWritrNm: string;
  sntncWritrNm: string;
  plscmpnIdNm: string | null;
  orginlTitle: string;
  originClCd: string | null;
  originClCdNm: string | null;
  stleClCd: string | null;
  stleClCdNm: string | null;
  mainGenreCd: string;
  mainGenreCdNm: string;
  outline: string;
  isbn: string;
  issn: string | null;
  setIsbn: string | null;
  pltfomCd: Number;
  pltfomCdNm: string;
  pltfomCmpnyIdNm: string;
  ageGradCd: Number;
  ageGradCdNm: string;
  pusryBeginDe: Number;
  pusryEndDe: string | null;
  fnshYn: string;
  pblcateYn: string;
  webtoonPusryYn: string;
  wnpzCareer: string | null;
  dstrcpIdNm: string | null;
  pblicteDe: string | null;
  dtaTyCd: string | null;
  dtaTyCdNm: string | null;
  orginlNationCd: string;
  orginlNationCdNm: string;
  relDe: string | null;
  tlviseBeginDe: string | null;
  tlviseEndDe: string | null;
  bdcpn: string | null;
  makr: string | null;
  distr: string | null;
  auspc: string | null;
  mngt: string | null;
  stndrd: string | null;
  pgeCo: string | null;
  wt: string | null;
  prc: number | null;
  eventSeCd: string | null;
  eventSeCdNm: string | null;
  cnsleNm: string | null;
  imageDownloadUrl: string;
}

export interface IBookData {
  result: IResult;
  itemList: IItem[];
}
