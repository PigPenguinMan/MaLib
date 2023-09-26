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
  pageNo: number;
  resultMessage: string;
  resultState: string;
  totalcount: number;
  viewItemCnt: number;
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
  pltfomCd: number;
  pltfomCdNm: string;
  pltfomCmpnyIdNm: string;
  ageGradCd: number;
  ageGradCdNm: string;
  pusryBeginDe: number;
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

export interface ISearchResult  {
  pageNo: number;
  resultMessage: string;
  resultState: string;
  totalcount: number;
  viewItemCnt: number;
}

export interface ISearchItem {
  prdctNm: string;
  title: string;
  subtitl: string | null;
  edtn: string | null;
  pictrWritrNm: string;
  sntncWritrNm: string;
  orginlTitle: string | null ;
  mainGenreCdNm: string;
  outline: string;
  isbn: string;
  setIsbn: string | null;
  plscmpnIdNm: string | null;
  pltfomCdNm: string;
  ageGradCdNm: string;
  imageDownloadUrl: string;
}
export interface ISearchData {
  result : ISearchResult
  itemList : ISearchItem
}