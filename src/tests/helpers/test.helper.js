const assert = require('chai').assert

module.exports = {
  // ===========================================
  // == helper functions
  // ===========================================
  hasBodyMessage (body, message) {
    assert.isString(body.message)
    assert.property(body, 'message')
    assert.propertyVal(body, 'message', message)
  },

  hasBodyErrors (body) {
    assert.property(body, 'errors')
    assert.isArray(body.errors)
  },

  hasBodyErrorsThatContains (body, message) {
    this.hasBodyErrors(body)
    assert.isNotEmpty(body.errors)
    assert.include(body.errors, message)
  },

  // ===========================================
  // == misc properties
  // ===========================================
  defaultSets: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },

  defaultSetsWithAuth: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NTM2NjMxMCwiZXhwIjoyNjA3NjUzNjYzMTB9.5yb5fhF3jfTXwudWMbBjXNCW8CWnzAUsNG_i14IJdDU;accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOmZhbHNlLCJpYXQiOjE1NjQ4NTg1NTIsImV4cCI6MTAwMTU2NDg1NzU1Mn0.tAY7j_oGz80fW4cZJZ-zAMFawRLkTx0OyDGccild0LM'
  },

  defaultSetsWithAccess: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDMiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBbGV4YW5kcmUiLCJsYXN0bmFtZSI6IlR1ZXQiLCJlbWFpbCI6ImFsZXhhbmRyZS50dWV0MUBlcHNpLmZyIiwiZ3JhZGUiOiJCMyBHMSIsImlhdCI6MTU2NTUxNzExMCwiZXhwIjoxMDAwMTU2NTUxNjExMH0.H-qPkz1CXboK_izNQ1SO78QSVtBlWhFbWx7wafsp5K4'
  },

  defaultSetsWithAccessWrongUser: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDEiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJidHMiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZmlyc3RuYW1lIjoiVGVzdCIsImxhc3RuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdC50ZXN0QGVwc2kuZnIiLCJncmFkZSI6IkIzIEcxIiwiaWF0IjoxNTY1NTE5MzYwLCJleHAiOjEwMDAxNTY1NTE4MzYwfQ.NW5W5fpwCPvauLMxS2v5aJX3eyn4PoTd-6rjcQwXyuk'
  },

  defaultSetsWithAccessAdmin: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsImVtYWlsIjoiYXJ0aHVyLmR1Zm91cjFAZXBzaS5mciIsImdyYWRlIjoiQjMgRzEiLCJpYXQiOjE1NjU1MTg0MTAsImV4cCI6MTAwMDE1NjU1MTc0MTB9.AGuT3Q7AtbEYfJ1ODLnmkojAD-Np_Sy-ea8hUWmqhuo'
  },

  defaultSetsWithRefresh: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDMiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBbGV4YW5kcmUiLCJsYXN0bmFtZSI6IlR1ZXQiLCJlbWFpbCI6ImFsZXhhbmRyZS50dWV0MUBlcHNpLmZyIiwiZ3JhZGUiOiJCMyBHMSIsImlhdCI6MTU2NTUxNzExMCwiZXhwIjoyNTkzNTY1NTE3MTEwfQ.6JOUIrTFoAqO46qp-k-JNnk2atqa5OfnI6fJrgTLedo'
  }
}
