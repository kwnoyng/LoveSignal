export type team = {
  teamUUID: string;
  members: member[];
};

export type member = {
  memberUUID: string;
  nickname: string;
  age: number;
  description: string;
  profileImage: string;
  gender?: string;
};

export type signupMember = {
  nickname: string;
  gender: string;
  birth: string;
  description: string;
};

//회원정보 조회시에 받아오는 데이터(굳이 필요한가 의문)
export type userInfo = {
  memberUUID: string;
  nickname: string;
  gender: string;
  age: number;
  description: string;
  teamUUID: string;
  teamLeader: boolean;
  profileImage: string;
};

//상대의 정보를 받아올때 받아오는 데이터
export type applyTeam = {
  haveMeetingTeam: boolean;
  members: member[];
  teamUUID: string;
};