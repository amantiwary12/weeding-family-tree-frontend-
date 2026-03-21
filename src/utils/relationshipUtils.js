//utils.relationshiputils.js
export const normalizeRelation = (relation = "") => {
  const r = relation.toLowerCase().trim();

  // ===== GREAT GRAND =====
  if (r.includes("great grandfather") || r.includes("great grandmother")) {
    return "great-grandparents";
  }

  // ===== GRAND =====
  if (r.includes("grandfather") || r.includes("grandmother")) {
    return "grandparents";
  }

  // ===== IN-LAWS (IMPORTANT: BEFORE parents/siblings) =====
  if (r.includes("in-law")) {
    return "inlaws";
  }

  // ===== PARENTS =====
  if (
    r === "father" ||
    r === "mother" ||
    r === "step father" ||
    r === "step mother" ||
    r === "adoptive father" ||
    r === "adoptive mother"
  ) {
    return "parents";
  }

  // ===== SPOUSES =====
  if (
    r === "groom" ||
    r === "bride" ||
    r === "husband" ||
    r === "wife"
  ) {
    return "spouses";
  }

  // ===== SIBLINGS =====
  if (
    r === "brother" ||
    r === "sister" ||
    r === "step brother" ||
    r === "step sister" ||
    r === "cousin"
  ) {
    return "siblings";
  }

  // ===== CHILDREN =====
  if (
    r === "son" ||
    r === "daughter" ||
    r === "step son" ||
    r === "step daughter" ||
    r === "adopted son" ||
    r === "adopted daughter"
  ) {
    return "children";
  }

  // ===== EXTENDED FAMILY =====
  if (
    r.includes("uncle") ||
    r.includes("aunt") ||
    r.includes("nephew") ||
    r.includes("niece")
  ) {
    return "extended";
  }

  return "others";
};
