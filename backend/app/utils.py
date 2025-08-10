from app import schemas


def serialize_candidate_obj(data):
    return [schemas.CandidateRead.model_validate(obj).model_dump(mode="json") for obj in data]

def serialize_interview_obj(data):
    return [schemas.InterviewRead.model_validate(obj).model_dump(mode="json") for obj in data]