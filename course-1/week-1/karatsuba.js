function multiply(n1, n2) {
  n1 = stripLeadingZeros(n1);
  n2 = stripLeadingZeros(n2);

  if (n1 === "0" || n2 === "0") {
    return "0";
  }

  if (n1.length <= 3 && n2.length <= 3) {
    return (parseInt(n1) * parseInt(n2)).toString();
  }

  if (n1.length % 2 === 1) n1 = "0" + n1;
  if (n2.length % 2 === 1) n2 = "0" + n2;

  [n1, n2] = normalizeLength(n1, n2)

  const m = n1.length;

  const [a, b] = halves(n1);
  const [c, d] = halves(n2);

  const ac = multiply(a, c);
  const bd = multiply(b, d);

  // (a + b) * (c + d) - ac - bd = ad + bc
  const ad_plus_bc = sub_s(
    sub_s(
      multiply(add_s(a, b), add_s(c, d)),
      ac
    ),
    bd
  );

  // Shift and add: 10^m * ac + 10^(m/2) * (ad + bc) + bd
  const term1 = ac === "0" ? "0" : ac + "0".repeat(m);
  const term2 = ad_plus_bc === "0" ? "0" : ad_plus_bc + "0".repeat(m / 2);
  
  return stripLeadingZeros(add_s(
    add_s(term1, term2),
    bd
  ));
}




function normalizeLength(n1, n2) {
  if (n1.length < n2.length) {  
    n1 = "0".repeat(n2.length - n1.length) + n1;
  } else if (n2.length < n1.length) {
    n2 = "0".repeat(n1.length - n2.length) + n2;
  }
  return [n1, n2]
}

function halves(s) {
  const mid = Math.floor(s.length / 2);
  return [s.slice(0, mid), s.slice(mid)];
}

function stripLeadingZeros(s) {
  if (s === "0") return "0";
  return s.replace(/^0+/, "") || "0";
}

function add_s(n1, n2) {
  n1 = stripLeadingZeros(n1);
  n2 = stripLeadingZeros(n2);
  
  [n1, n2] = normalizeLength(n1, n2)
  let result = "";
  let carry = 0;

  for (let i = n1.length - 1; i >= 0; i--) {
    const v = parseInt(n1[i]) + parseInt(n2[i]) + carry
    if (v <= 9) {
      result = v.toString() + result;
      carry = 0;
    } else {
      result = (v % 10).toString() + result;
      carry = Math.floor(v / 10);
    }
  }

  if (carry) {
    result = carry + result;
  }

  return stripLeadingZeros(result);
}

function sub_s(n1, n2) {
  n1 = stripLeadingZeros(n1);
  n2 = stripLeadingZeros(n2);
  
  [n1, n2] = normalizeLength(n1, n2)

  let result = "";
  let borrow = 0;

  for (let i = n1.length - 1; i >= 0; i--) {
    let d = parseInt(n1[i]) - parseInt(n2[i]) - borrow;
    if (d < 0) {
      d += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result = d.toString() + result;
  }

  return stripLeadingZeros(result);
}

