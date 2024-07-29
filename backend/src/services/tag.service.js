const getTagCategory = async (db) => {

    return new Promise((resolve, reject) => {


        db.query(`SELECT * FROM tag_category`,
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            })
    })
}

const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM tag WHERE status != 0`,
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ data: res });
            })
    })
}


const getTag = async (db) => {
    const agr = [];
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tag_category',
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                res.map((tag) => {
                    db.query(`SELECT tag_name FROM tag WHERE id = ?`, [tag.tag_id],
                        (err, item) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            db.query(`SELECT category_name FROM categories WHERE id = ?`, [tag.category_id],
                                (err, category) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve({ data: { id: res[0].id, category: category[0].category_name, tag: item[0].tag_name } })
                                });
                        })
                })
                // console.log()
            })
    })
}


const getTagAndCategory = async (db) => {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT tc.category_id, tc.tag_id, c.category_name as name_cat, t.tag_name as name_tag, tc.id
                FROM tag_category tc
                LEFT JOIN tag t ON t.id =tc.tag_id
                LEFT JOIN categories c ON c.id = tc.category_id
                WHERE c.status != 0 AND t.status != 0
        `,(err,res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
}

module.exports = {
    getTagCategory,
    getAll,
    getTag,
    getTagAndCategory

}