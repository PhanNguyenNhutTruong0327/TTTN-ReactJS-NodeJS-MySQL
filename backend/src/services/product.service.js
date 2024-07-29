const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};



const getAll = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT
                    (SELECT COUNT(*) FROM products WHERE status != 0) AS total,
                    (SELECT COUNT(*) FROM products WHERE status = 0) AS qty_trash
                FROM products WHERE status != 0`,
            (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                // resolve(countResult)
                db.query(
                    `SELECT p.*, b.name AS nameBrand, c.category_name AS nameCat, ps.qty , ps.qty_sold
                    FROM products p
                    JOIN brand b ON p.brand_id = b.id
                    JOIN categories c ON p.category_id = c.id
                    LEFT JOIN product_store ps ON ps.product_id = p.id
                    WHERE p.status != 0
                    ORDER BY p.created_at DESC
                    LIMIT ?, ?`,
                    [(page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = countResult[0].total;
                        const qty_trash = countResult[0].qty_trash;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                    qty_trash
                                }
                            }
                        }
                        )
                    }
                )
            })
    })
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.id as product_id, p.name, p.slug, p.category_id, p.brand_id, p.image, p.image_detail,
             p.price, p.detail_1, p.detail_2, p.created_at as createPro, p.updated_at as updatePro, p.status,
             c.category_name AS nameCat, b.name AS nameBrand, d.chip, d.screen, d.front_camera, d.rear_camera, d.operating_system,
             d.ram, d.rom, d.pin, d.size, d.size, d.connect, ps.qty, ps.qty_sold
             FROM products p
             JOIN categories c ON c.id = p.category_id
             JOIN brand b ON b.id = p.brand_id
             LEFT JOIN product_store ps ON ps.product_id = p.id
             LEFT JOIN description d ON d.product_id = p.id
            WHERE p.id = ?`, [id]
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [] });
                    return;
                }
                resolve({ data: res[0] });
            });
    });
}


// const getProductByCatgory = async (db, category_id, tag_id) => {
//     return new Promise((resolve, reject) => {

//         const listid = [parseInt(category_id)];

//         db.query(`SELECT * FROM tag WHERE status = 1 AND id = ?`, [tag_id],
//             (err, res) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 if (res.length === 0) {
//                     resolve({ data: [] });
//                     return;
//                 }

//                 db.query(`SELECT * FROM categories WHERE status = 1 AND id = ?`, [category_id],
//                     (err, cat) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
//                         if (cat.length === 0) {
//                             resolve({ data: [] });
//                             return;
//                         }
//                         db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`, [category_id],
//                             (err, countResult) => {
//                                 if (err) {
//                                     reject(err);
//                                     return;
//                                 }

//                                 if (countResult.length > 0) {
//                                     for (const row1 of countResult) {
//                                         listid.push(row1.id);
//                                         db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
//                                             (err, countResult2) => {
//                                                 if (err) {
//                                                     reject(err);
//                                                     return;
//                                                 }
//                                                 if (countResult2.length > 0) {
//                                                     for (const row2 of countResult2) {
//                                                         listid.push(row2.id);
//                                                     }
//                                                 }
//                                             }
//                                     }
//                                 }
//                                 console.log(res)
//                                 db.query(`SELECT * FROM products WHERE status = 1 AND category_id IN (?) LIMIT 4`, [listid],
//                                     (err, result) => {
//                                         if (err) {
//                                             reject(err);
//                                             return;
//                                         }
//                                         if (result.length === 0) {
//                                             resolve({ data: [] })
//                                         }
//                                         resolve({ data: result, tag: res[0].tag_name, short_description: res[0].short_description,nameCat: cat[0].category_name });
//                                     })
//                             })

//                     })


//             }
//         )

//     })
// }
const getProductByCatgory = async (db, category_id, tag_id) => {
    return new Promise((resolve, reject) => {

        const listid = [parseInt(category_id)];
        const listPro = [];

        db.query(`SELECT * FROM tag WHERE status = 1 AND id = ?`, [tag_id],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [] });
                    return;
                }

                db.query(`SELECT * FROM categories WHERE status = 1 AND id = ?`, [category_id],
                    (err, cat) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (cat.length === 0) {
                            resolve({ data: [] });
                            return;
                        }
                        db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`, [category_id],
                            (err, countResult) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                if (countResult.length > 0) {
                                    for (const row1 of countResult) {
                                        listid.push(row1.id);
                                        db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
                                            (err, countResult2) => {
                                                if (err) {
                                                    reject(err);
                                                    return;
                                                }
                                                if (countResult2.length > 0) {
                                                    for (const row2 of countResult2) {
                                                        listid.push(row2.id);
                                                    }
                                                }
                                            }
                                    }
                                }
                                // console.log(res)
                                db.query(
                                    `SELECT dp.product_id
                                    FROM discounted_products dp
                                    JOIN products p ON p.id = dp.product_id
                                    WHERE dp.qty > dp.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND p.category_id IN (?)`, [listid],
                                    (err, product_id) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (product_id.length > 0) {
                                            for (const id of product_id) {
                                                listPro.push(id.product_id);
                                            }
                                        }


                                        if (listPro.length > 0) {
                                            db.query(`SELECT p.* FROM products p JOIN product_store ps ON ps.product_id = p.id WHERE ps.qty > ps.qty_sold AND p.status = 1 AND p.category_id IN (?) AND p.id NOT IN (?) LIMIT 4`, [listid, listPro],
                                                (err, result) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    if (result.length === 0) {
                                                        resolve({ data: [] })
                                                    }
                                                    resolve({ data: result, tag: res[0].tag_name, short_description: res[0].short_description, nameCat: cat[0].category_name, slugCat: cat[0].slug });
                                                })
                                        }
                                        else {
                                            db.query(`SELECT p.* FROM products p JOIN product_store ps ON ps.product_id = p.id WHERE ps.qty > ps.qty_sold AND p.status = 1 AND p.category_id IN (?) LIMIT 4`, [listid],
                                                (err, result) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    if (result.length === 0) {
                                                        resolve({ data: [] })
                                                    }
                                                    resolve({ data: result, tag: res[0].tag_name, short_description: res[0].short_description, nameCat: cat[0].category_name, slugCat: cat[0].slug });
                                                })

                                        }

                                    }
                                )

                            })

                    })


            }
        )

    })
}


// const getProductByCatgoryPagination = async (db, slug, page, limit) => {
//     return new Promise((resolve, reject) => {

//         db.query(`SELECT id FROM categories WHERE slug = ?`, [slug],
//             (err, res) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }

//                 const listid = [res[0].id];

//                 console.log(listid);

//                 db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`, [res[0].id],
//                     (err, countResult) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }

//                         if (countResult.length > 0) {
//                             // console.log(countResult[0].qty_cat);
//                             for (const row1 of countResult) {
//                                 console.log(row1.id);
//                                 listid.push(row1.id);
//                                 db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
//                                     (err, countResult2) => {
//                                         if (err) {
//                                             reject(err);
//                                             return;
//                                         }
//                                         if (countResult2.length > 0) {
//                                             for (const row2 of countResult2) {
//                                                 listid.push(row2.id);
//                                             }
//                                         }
//                                     }
//                             }
//                         }

//                         // db.query(`SELECT `)


//                         db.query(`SELECT * FROM products WHERE status = 1 AND category_id IN (?) LIMIT ?, ?`, [listid, (page - 1) * limit, limit],
//                             (err, products) => {
//                                 if (err) {
//                                     reject(err);
//                                     return;
//                                 }
//                                 if (products.length === 0) {
//                                     resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
//                                 }
//                                 const total = products.length;
//                                 const pageCount = Math.ceil(total / limit);
//                                 resolve({
//                                     data: products,
//                                     meta: {
//                                         pagination: {
//                                             page: parseInt(page, 10),
//                                             pageSize: parseInt(limit, 10),
//                                             pageCount,
//                                             total,
//                                         }
//                                     }
//                                 }
//                                 )
//                             })

//                     })
//             })
//     }
//     )
// }



// const getDetailProductBySlugAndProductOther = async (db, slug) => {

//     return new Promise((resolve, reject) => {

//         db.query(
//             `SELECT p.id , p.name, p.slug, p.category_id, p.brand_id,
//             p.price, p.image, p.image_detail ,p.detail_1, p.detail_2, p.created_at as createPro, p.updated_at as updatePro, p.status,
//             c.category_name AS nameCat, b.name AS nameBrand, d.chip, d.screen, d.rear_camera, d.front_camera, d.operating_system,
//             d.ram, d.rom, d.pin, d.connect, d.size
//             FROM products p
//             JOIN categories c ON c.id = p.category_id
//             JOIN brand b ON b.id = p.brand_id
//             JOIN description d ON d.product_id = p.id
//             WHERE p.slug = ?`, [slug],
//             (err, product) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 // if (product.length === 0) {
//                 //     resolve({ data: [], productOther:[] })
//                 // }
//                 console.log(product);
//                 const listid = [product[0].category_id];
//                 console.log(product[0].category_id);
//                 db.query(`SELECT * FROM categories WHERE status = 1 AND parent = ?`, [product[0].category_id],
//                     (err, categories) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }

//                         if (categories.length > 0) {
//                             for (const row1 of categories.length) {
//                                 listid.push(row1.id);
//                                 db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
//                                     (err, countResult2) => {
//                                         if (err) {
//                                             reject(err);
//                                             return;
//                                         }
//                                         if (countResult2.length > 0) {
//                                             for (const row2 of countResult2.length) {
//                                                 listid.push(row2.id);
//                                             }
//                                         }
//                                     }
//                             }
//                         }

//                         db.query(`SELECT * FROM products WHERE id != ? AND status = 1 AND category_id IN (?) LIMIT 6`, [product[0].id, listid],
//                             (err, productOther) => {
//                                 if (err) {
//                                     reject(err);
//                                     return;
//                                 }
//                                 if (productOther.length === 0) {
//                                     resolve({ data: [], productOther: [], image_related: [] })
//                                 }
//                                 db.query(`SELECT image FROM image WHERE product_id = ?`, [product[0].id],
//                                     (err, images) => {
//                                         if (err) {
//                                             reject(err);
//                                             return;
//                                         }

//                                         resolve({ data: product[0], productOther: productOther, image_related: images })

//                                     })
//                             }
//                         )

//                     }
//                 )


//             })
//     })

// }

const getProductByCatgoryPagination = async (db, slug, page, limit) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT id FROM categories WHERE slug = ?`, [slug],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                const listid = [res[0].id];

                console.log(listid);

                db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`, [res[0].id],
                    (err, countResult) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (countResult.length > 0) {
                            // console.log(countResult[0].qty_cat);
                            for (const row1 of countResult) {
                                console.log(row1.id);
                                listid.push(row1.id);
                                db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
                                    (err, countResult2) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (countResult2.length > 0) {
                                            for (const row2 of countResult2) {
                                                listid.push(row2.id);
                                            }
                                        }
                                    }
                            }
                        }

                        // db.query(`SELECT `)


                        db.query(`
                        SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                        FROM discounted_products dp
                        JOIN sale s ON s.id = dp.sale_id
                        JOIN products p ON p.id = dp.product_id
                        JOIN product_store ps ON ps.product_id = p.id
                        WHERE p.category_id IN (?) AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND ps.qty > ps.qty_sold
                        UNION ALL
                        SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                        FROM products p
                        JOIN product_store ps ON ps.product_id = p.id
                        WHERE ps.qty > ps.qty_sold AND p.status =1 AND p.category_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp JOIN product_store ps ON ps.product_id = dp.product_id WHERE ps.qty > ps.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                      `, [listid, listid],
                            (err, qty) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                if (qty.length === 0) {
                                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                                }
                                db.query(`
                                    SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                                    FROM discounted_products dp
                                    JOIN sale s ON s.id = dp.sale_id
                                    JOIN products p ON p.id = dp.product_id
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE p.category_id IN (?) AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND ps.qty > ps.qty_sold
                                    UNION ALL
                                    SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                                    FROM products p
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE ps.qty > ps.qty_sold AND p.status =1 AND p.category_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp JOIN product_store ps ON ps.product_id = dp.product_id WHERE ps.qty > ps.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                                    LIMIT ?, ?
                                  `, [listid, listid, (page - 1) * limit, limit],
                                    (err, products) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (products.length === 0) {
                                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                                        }
                                        const total = qty.length;
                                        const pageCount = Math.ceil(total / limit);
                                        resolve({
                                            data: products,
                                            meta: {
                                                pagination: {
                                                    page: parseInt(page, 10),
                                                    pageSize: parseInt(limit, 10),
                                                    pageCount,
                                                    total,
                                                }
                                            }
                                        }
                                        )
                                    })

                            })

                    })
            })
    }
    )
}

const getDetailProductBySlugAndProductOther = async (db, slug) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT dp.product_id
        FROM discounted_products dp
        JOIN products p ON p.id = dp.product_id
        WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND p.slug = ?`, [slug],
            (err, sale) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (sale.length === 0) {
                    db.query(
                        `SELECT p.id , p.name, p.slug, p.category_id, p.brand_id,
                        p.price as price, p.image, p.image_detail ,p.detail_1, p.detail_2, p.created_at as createPro, p.updated_at as updatePro, p.status,
                        c.category_name AS nameCat, c.slug as slugCat,b.name AS nameBrand, d.chip, d.screen, d.rear_camera, d.front_camera, d.operating_system,
                        d.ram, d.rom, d.pin, d.connect, d.size, ps.qty, ps.qty_sold
                        FROM products p
                        JOIN categories c ON c.id = p.category_id
                        JOIN brand b ON b.id = p.brand_id
                        JOIN product_store ps ON ps.product_id = p.id
                        LEFT JOIN description d ON d.product_id = p.id
                        WHERE ps.qty > ps.qty_sold AND p.slug = ?`, [slug],
                        (err, product) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            // if (product.length === 0) {
                            //     resolve({ data: [], productOther:[] })
                            // }
                            console.log(product);
                            const listid = [product[0].category_id];
                            console.log(product[0].category_id);
                            db.query(`SELECT * FROM categories WHERE status = 1 AND parent = ?`, [product[0].category_id],
                                (err, categories) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }

                                    if (categories.length > 0) {
                                        for (const row1 of categories) {
                                            listid.push(row1.id);
                                            db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
                                                (err, countResult2) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    if (countResult2.length > 0) {
                                                        for (const row2 of countResult2) {
                                                            listid.push(row2.id);
                                                        }
                                                    }
                                                }
                                        }
                                    }

                                    db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                                    FROM discounted_products dp
                                    JOIN sale s ON s.id = dp.sale_id
                                    JOIN products p ON p.id = dp.product_id
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE p.category_id IN (?) AND p.id != ? AND p.status = 1 AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND dp.qty > dp.qty_sold
                                    UNION ALL
                                    SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                                    FROM products p
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE p.id != ? AND ps.qty > ps.qty_sold AND p.status =1 AND p.category_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.qty > dp.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                                    LIMIT 6`, [listid, product[0].id, product[0].id, listid],
                                        (err, productOther) => {
                                            if (err) {
                                                reject(err);
                                                return;
                                            }
                                            // if (productOther.length === 0) {
                                            //     resolve({ data: product[0], productOther: [], image_related: [], related_accessories: [] })
                                            // }
                                            db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                                            FROM discounted_products dp
                                            JOIN sale s ON s.id = dp.sale_id
                                            JOIN products p ON p.id = dp.product_id
                                            JOIN related_accessories ra ON ra.accessories_id = dp.product_id
                                            WHERE ra.product_id = ? AND p.id != ? AND p.status = 1 AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND dp.qty > dp.qty_sold
                                            UNION ALL
                                            SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                                            FROM products p
                                            JOIN product_store ps ON ps.product_id = p.id
                                            JOIN related_accessories ra ON ra.accessories_id = p.id
                                            WHERE ra.product_id = ? AND p.id != ? AND ps.qty > ps.qty_sold AND p.status =1 AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.qty > dp.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                                            LIMIT 6`, [product[0].id, product[0].id, product[0].id, product[0].id],
                                                (err, accessories) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    resolve({ data: product[0], productOther: productOther, related_accessories: accessories })
                                                })
                                        }
                                    )

                                }
                            )


                        })

                }
                else {
                    db.query(
                        `SELECT p.id , p.name, p.slug, p.category_id, p.brand_id,
                        p.price as price_initial, p.image, p.image_detail ,p.detail_1, p.detail_2, p.created_at as createPro, p.updated_at as updatePro, p.status,
                        c.category_name AS nameCat, c.slug as slugCat,b.name AS nameBrand, d.chip, d.screen, d.rear_camera, d.front_camera, d.operating_system,
                        d.ram, d.rom, d.pin, d.connect, d.size, ROUND(p.price - (p.price * s.percent_sale / 100)) as price, dp.qty , dp.qty_sold
                        FROM products p
                        JOIN categories c ON c.id = p.category_id
                        JOIN brand b ON b.id = p.brand_id
                        LEFT JOIN description d ON d.product_id = p.id
                        JOIN discounted_products dp ON dp.product_id = p.id
                        JOIN sale s ON s.id = dp.sale_id
                        JOIN product_store ps ON ps.product_id = p.id
                        WHERE dp.qty > dp.qty_sold AND p.slug = ?`, [slug],
                        (err, product) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            // if (product.length === 0) {
                            //     resolve({ data: [], productOther:[] })
                            // }
                            console.log(product);
                            const listid = [product[0].category_id];
                            console.log(product[0].category_id);
                            db.query(`SELECT * FROM categories WHERE status = 1 AND parent = ?`, [product[0].category_id],
                                (err, categories) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }

                                    if (categories.length > 0) {
                                        for (const row1 of categories.length) {
                                            listid.push(row1.id);
                                            db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1`), [row1.id],
                                                (err, countResult2) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    if (countResult2.length > 0) {
                                                        for (const row2 of countResult2.length) {
                                                            listid.push(row2.id);
                                                        }
                                                    }
                                                }
                                        }
                                    }

                                    db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                                    FROM discounted_products dp
                                    JOIN sale s ON s.id = dp.sale_id
                                    JOIN products p ON p.id = dp.product_id
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE p.category_id IN (?) AND p.id != ? AND p.status = 1 AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND dp.qty > dp.qty_sold
                                    UNION ALL
                                    SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                                    FROM products p
                                    JOIN product_store ps ON ps.product_id = p.id
                                    WHERE p.id != ? AND ps.qty > ps.qty_sold AND p.status =1 AND p.category_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.qty > dp.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                                    LIMIT 6`, [listid, product[0].id, product[0].id, listid],
                                        (err, productOther) => {
                                            if (err) {
                                                reject(err);
                                                return;
                                            }
                                            if (productOther.length === 0) {
                                                resolve({ data: [], productOther: [] })
                                            }
                                            db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                                            FROM discounted_products dp
                                            JOIN sale s ON s.id = dp.sale_id
                                            JOIN products p ON p.id = dp.product_id
                                            JOIN related_accessories ra ON ra.accessories_id = dp.product_id
                                            WHERE ra.product_id = ? AND p.id != ? AND p.status = 1 AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND dp.qty > dp.qty_sold
                                            UNION ALL
                                            SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                                            FROM products p
                                            JOIN product_store ps ON ps.product_id = p.id
                                            JOIN related_accessories ra ON ra.accessories_id = p.id
                                            WHERE ra.product_id = ? AND p.id != ? AND ps.qty > ps.qty_sold AND p.status =1 AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.qty > dp.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                                            LIMIT 6`, [product[0].id, product[0].id, product[0].id, product[0].id],
                                                (err, accessories) => {
                                                    if (err) {
                                                        reject(err);
                                                        return;
                                                    }
                                                    resolve({ data: product[0], productOther: productOther, related_accessories: accessories })
                                                })
                                        }
                                    )

                                }
                            )


                        })

                }

            })

    })

}


const getProductBrandPagination = async (db, slug, page, limit) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT id FROM brand WHERE slug = ?`, [slug],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                const listid = [res[0].id];

                console.log(listid);

                db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                FROM discounted_products dp
                JOIN sale s ON s.id = dp.sale_id
                JOIN products p ON p.id = dp.product_id
                JOIN product_store ps ON ps.product_id = p.id
                WHERE p.brand_id IN (?) AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND ps.qty > ps.qty_sold
                UNION ALL
                SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                FROM products p
                JOIN product_store ps ON ps.product_id = p.id
                WHERE ps.qty > ps.qty_sold AND p.status = 1 AND p.brand_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp JOIN product_store ps ON ps.product_id = dp.product_id WHERE ps.qty > ps.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                `, [listid, listid],
                    (err, qty) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (qty.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        db.query(`SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
                            FROM discounted_products dp
                            JOIN sale s ON s.id = dp.sale_id
                            JOIN products p ON p.id = dp.product_id
                            JOIN product_store ps ON ps.product_id = p.id
                            WHERE p.brand_id IN (?) AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND ps.qty > ps.qty_sold
                            UNION ALL
                            SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
                            FROM products p
                            JOIN product_store ps ON ps.product_id = p.id
                            WHERE ps.qty > ps.qty_sold AND p.status = 1 AND p.brand_id IN (?) AND p.id NOT IN (SELECT dp.product_id FROM discounted_products dp JOIN product_store ps ON ps.product_id = dp.product_id WHERE ps.qty > ps.qty_sold AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
                            LIMIT ?, ?`, [listid, listid, (page - 1) * limit, limit],
                            (err, products) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                if (products.length === 0) {
                                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                                }
                                const total = qty.length;
                                const pageCount = Math.ceil(total / limit);
                                resolve({
                                    data: products,
                                    meta: {
                                        pagination: {
                                            page: parseInt(page, 10),
                                            pageSize: parseInt(limit, 10),
                                            pageCount,
                                            total,
                                        }
                                    }
                                }
                                )
                            })

                    })
            })
    }
    )
}

// const getProductBrandPagination = async (db, slug, page, limit) => {
//     return new Promise((resolve, reject) => {

//         db.query(`SELECT id FROM brand WHERE slug = ?`, [slug],
//             (err, res) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }

//                 const listid = [res[0].id];

//                 console.log(listid);

//                 db.query(`SELECT * FROM products WHERE status = 1 AND brand_id IN (?) LIMIT ?, ?`, [listid, (page - 1) * limit, limit],
//                     (err, products) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
//                         if (products.length === 0) {
//                             resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
//                         }

//                         db.query(`SELECT p.*, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
//                         FROM products p
//                         JOIN discounted_products dp ON dp.product_id = p.id
//                         JOIN sale s ON s.id = dp.sale_id
//                         WHERE dp.status = 1 AND p.status = 1 AND p.brand_id IN (?) LIMIT ?, ?`, [listid, (page - 1) * limit, limit],
//                             (err, product_sale) => {
//                                 if (err) {
//                                     reject(err);
//                                     return;
//                                 }
//                                 if (products.length === 0) {
//                                     resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
//                                 }
//                                 const total = products.length;
//                                 const pageCount = Math.ceil(total / limit);
//                                 resolve({
//                                     data: products,
//                                     meta: {
//                                         pagination: {
//                                             page: parseInt(page, 10),
//                                             pageSize: parseInt(limit, 10),
//                                             pageCount,
//                                             total,
//                                         }
//                                     }
//                                 }
//                                 )
//                             })

//                     })


//             })
//     }
//     )
// }

const getAllProductPagination = async (db, page, limit) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT SUM(total) AS sum_total
        FROM (
            SELECT COUNT(*) AS total
            FROM discounted_products dp
            JOIN sale s ON s.id = dp.sale_id
            JOIN products p ON p.id = dp.product_id
            WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time
            UNION ALL
            SELECT COUNT(*) AS total
            FROM products
            WHERE status = 1 AND id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time)
        ) AS subquery`, (err, qty) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(qty[0].sum_total);
            if (qty[0].sum_total == 0) {
                resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
            }
            else {
                db.query(`SELECT p.name, p.price, p.image, p.id, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale, dp.created_at
                FROM discounted_products dp
                JOIN sale s ON s.id = dp.sale_id
                JOIN products p ON p.id = dp.product_id
                WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time
                UNION ALL
                SELECT name, price, image, id, slug, NULL AS price_sale, created_at
                FROM products
                WHERE status = 1 AND id NOT IN (SELECT dp.product_id FROM discounted_products dp WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time) ORDER BY created_at DESC
                LIMIT ?, ?`, [(page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = qty[0].sum_total;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                }
                            }
                        }
                        )
                    })

            }
        })


    }
    )
}


const displayProduct = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM products WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }

                if (res.length === 0) {
                    resolve({ Error: 'Không tìm thấy dữ liệu' });
                } else {
                    const currentStatus = res[0].status;
                    const newStatus = currentStatus === 1 ? 2 : 1;

                    db.query(`UPDATE products SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ Error: 'Failed to update product status' });
                            } else {
                                resolve({ message: 'Cập nhật thành công' });
                            }
                        }
                    );
                }
            }
        );
    });
};



const getSearchProductPagination = async (db, key, page, limit) => {
    return new Promise((resolve, reject) => {
        console.log(key);
        db.query(`
        SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
        FROM discounted_products dp
        JOIN sale s ON s.id = dp.sale_id
        JOIN products p ON p.id = dp.product_id
        WHERE p.name LIKE ? AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time AND dp.qty > dp.qty_sold
        UNION ALL
        SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
        FROM products p
        JOIN product_store ps ON ps.product_id = p.id
        WHERE p.name LIKE ? AND p.status = 1 AND p.id NOT IN (
        SELECT dp.product_id
        FROM discounted_products dp
        JOIN products p ON p.id = dp.product_id
        WHERE dp.qty > dp.qty_sold AND p.name LIKE ? AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time) `,
            [`%${key}%`, `%${key}%`, `%${key}%`],
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (qty.length === 0) {
                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                }
                db.query(`
                SELECT p.name, p.price, p.image, p.id AS id_pro, p.slug, (p.price - (p.price * s.percent_sale / 100)) AS price_sale
        FROM discounted_products dp
        JOIN sale s ON s.id = dp.sale_id
        JOIN products p ON p.id = dp.product_id
        WHERE dp.qty > dp.qty_sold AND p.name LIKE ? AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time
        UNION ALL
        SELECT p.name, p.price, p.image, p.id, p.slug, NULL AS price_sale
        FROM products p
        JOIN product_store ps ON ps.product_id = p.id
        WHERE p.name LIKE ? AND p.status = 1 AND p.id NOT IN (
          SELECT dp.product_id
          FROM discounted_products dp
          JOIN products p ON p.id = dp.product_id
          WHERE dp.qty > dp.qty_sold AND p.name LIKE ? AND dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time
        )
        LIMIT ?, ?
        `,
                    [`%${key}%`, `%${key}%`, `%${key}%`, (page - 1) * limit, limit],
                    (err, products) => {
                        console.log(products);
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = qty.length;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                }
                            }
                        }
                        )
                    })

            })

    }
    )
}


const trashProduct = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM discounted_products WHERE product_id = ? AND status = 1 AND NOW() BETWEEN start_time AND end_time`, [id],
            (err, qty_sale) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                console.log(qty_sale.length);
                if (qty_sale.length === 0) {
                    db.query(`SELECT o.id FROM order_detail od JOIN orders o ON o.id = od.order_id WHERE od.product_id = ? AND o.status IN (1,2)`, [id],
                        (err, qty_order) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }
                            if (qty_order.length === 0) {
                                db.query(`UPDATE products SET status = 0 WHERE id = ?`, [id],
                                    (err, result) => {
                                        if (err) {
                                            console.error('Error:', err.message);
                                            return reject(err);
                                        }
                                        resolve({ message: 'Đã xóa dữ liệu vào thùng rác !' });
                                    }
                                )
                            }
                            else {
                                resolve({ message: 'Sản phẩm đang có đơn hàng vận chuyển không thể xóa !' });
                            }
                        })
                }
                else {
                    resolve({ message: 'Sản phẩm đang trong chương trình khuyến mãi không thể xóa !' });
                }
            }
        )
    })
}


const rescoverTrashProduct = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE products SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Product not found' });
                }
                resolve({ message: 'Phục hồi dữ liệu thành công !' });
            }
        )
    })
}


const getListTrash = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM products WHERE status = 0`,
            (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                // resolve(countResult)
                db.query(
                    `SELECT p.*, b.name AS nameBrand, c.category_name AS nameCat
                    FROM products p
                    JOIN brand b ON p.brand_id = b.id
                    JOIN categories c ON p.category_id = c.id
                    WHERE p.status = 0
                    ORDER BY p.created_at DESC
                    LIMIT ?, ?`,
                    [(page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = countResult.length;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                }
                            }
                        }
                        )
                    }
                )
            })
    })
}


const deleteProduct = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM description WHERE product_id = ?`, [id],
            (err, description) => {
                if (err) {
                    console.error('Error: ', err.message);
                    return reject;
                }
                db.query(`DELETE FROM product_store WHERE product_id = ?`, [id],
                    (err, store) => {
                        if (err) {
                            console.error('Error: ', err.message);
                            return reject;
                        }
                        db.query(`DELETE FROM products WHERE id = ?`, [id],
                            (err, product) => {
                                if (err) {
                                    console.error('Error: ', err.message);
                                    return reject;
                                }
                                resolve({ message: 'Xóa sản phẩm thành công !', success: 'true' },);
                            }
                        )

                    }
                )
            }
        )
    });
}


const getAllProNotSale = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`
                SELECT product_id       
                FROM discounted_products WHERE status != 0`,
            (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                const listid = [];
                for (const row1 of countResult) {
                    listid.push(row1.product_id)
                }
                console.log(listid);
                db.query(
                    `SELECT p.*, b.name AS nameBrand, c.category_name AS nameCat, ps.qty, ps.qty_sold
                    FROM products p
                    LEFT JOIN brand b ON p.brand_id = b.id
                    LEFT JOIN categories c ON p.category_id = c.id
                    JOIN product_store ps ON ps.product_id = p.id
                    WHERE p.status = 1 AND p.id NOT IN (?)
                    ORDER BY p.created_at DESC
                    LIMIT ?, ?`,
                    [listid, (page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = products.length;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total
                                }
                            }
                        }
                        )
                    }
                )
            })
    })
}

const createProduct = async (db, { name, category_id, brand_id, price, image, image_detail, detail_1, detail_2, status, created_by }) => {
    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(name);
        const createdAt = new Date();

        db.query('INSERT INTO products (name, slug, category_id, brand_id, price, image, image_detail, detail_1, detail_2, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, formattedSlug, category_id, brand_id, price, image, image_detail, detail_1, detail_2, status, created_by, createdAt],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Thêm sản phẩm không thành công !' });
                    return;
                }
                resolve(result.insertId);
            })
    })
}

const insertDescription = async (db, { id, chip, screen, rear_camera, front_camera, operating_system, ram, rom, pin, size, connect }) => {
    return new Promise((resolve, reject) => {
        const createdAt = new Date();
        db.query(`INSERT INTO description (product_id, chip, screen, rear_camera, front_camera, operating_system, ram, rom, pin, size, connect, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, chip, screen, rear_camera, front_camera, operating_system, ram, rom, pin, size, connect, createdAt],
            (err, description) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (description.affectedRows === 0) {
                    resolve({ message: 'Sản phẩm đã được thêm. Nhưng thêm thông số kỹ thuật đã có lỗi. Hãy thử lại sau !' });
                    return;
                }
                resolve(description);
            })
    })
}

// const insertImage = async (db, { id, image }) => {
//     return new Promise((resolve, reject) => {
//         db.query('INSERT INTO image (product_id, image) VALUES (?, ?)', [id, image],
//             (err, imge) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 if (imge.affectedRows == 0) {

//                 }
//                 resolve(imge);
//             })
//     })
// }

const insertStoreQty = async (db, { id, qty }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO product_store (product_id, qty) VALUES (?, ?)', [id, qty],
            (err, store) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (store.affectedRows == 0) {

                }
                resolve(store);
            })
    })
}

const updateProduct = async (db, { name, category_id, brand_id, price, image, image_detail, detail_1, detail_2, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(name);
        const createdAt = new Date();

        db.query('UPDATE products SET name = ?, slug = ?, category_id = ?, brand_id = ?, price = ?, image = ?, image_detail = ?, detail_1 = ?, detail_2 = ?, status = ?, updated_by = ?, updated_at = ? WHERE id = ?',
            [name, formattedSlug, category_id, brand_id, price, image, image_detail, detail_1, detail_2, status, updated_by, createdAt, id],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.affectedRows === 0) {
                    resolve({ error: 'Cập nhật sản phẩm không thành công !' });
                    return;
                }
                resolve(result);
            })
    })
}

const updateDescription = async (db, { chip, screen, rear_camera, front_camera, operating_system, ram, rom, pin, size, connect }, id) => {
    return new Promise((resolve, reject) => {
        const createdAt = new Date();
        db.query(`UPDATE description SET chip = ?, screen = ?, rear_camera = ?, front_camera = ?, operating_system = ?, ram = ?, rom = ?, pin = ?, size = ?, connect = ? WHERE product_id = ?`,
            [chip, screen, rear_camera, front_camera, operating_system, ram, rom, pin, size, connect, id],
            (err, description) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (description.affectedRows === 0) {
                    resolve({ error: 'Cập nhật thông số kỹ thuật đã có lỗi. Hãy thử lại sau !' });
                    return;
                }
                resolve(description);
            })
    })
}

// const updateImage = async (db, { image, limit_min, limit_max }, id) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM image WHERE product_id = ? LIMIT ?, ?', [id, limit_min, limit_max],
//             (err, result) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 if (result.affectedRows == 0) {
//                     resolve({ message: 'Không tìm thấy ảnh liên quan !' });
//                 }
//                 db.query('UPDATE image SET image = ? WHERE id = ?', [image, result[0].id],
//                     (err, imge) => {
//                         if (err) {
//                             reject(err);
//                             return;
//                         }
//                         if (imge.affectedRows == 0) {
//                             resolve({ message: 'Cập nhật hình ảnh liên quan gặp lỗi !' });
//                         }
//                         resolve(imge);
//                     })
//             })
//     })
// }

const updateStoreQty = async (db, { id, qty }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE product_store SET qty = ? WHERE product_id = ?', [qty, id],
            (err, store) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (store.affectedRows == 0) {

                }
                resolve(store);
            })
    })
}


const getProductBestSeller = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT p.id, p.price, p.image, p.name, p.slug, COUNT(*) AS total
            FROM products p
            INNER JOIN order_detail od ON od.product_id = p.id
            INNER JOIN orders o ON o.id = od.order_id
            WHERE p.status = 1 AND o.status = 3
            GROUP BY od.product_id, p.id, p.price, p.image,p.name
            ORDER BY total DESC
            LIMIT 6`, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ data: results });
        })
    })
}


module.exports = {
    getAll,
    getOne,
    getProductByCatgory,
    getProductByCatgoryPagination,
    getDetailProductBySlugAndProductOther,
    getProductBrandPagination,
    getAllProductPagination,
    displayProduct,
    getSearchProductPagination,
    trashProduct,
    rescoverTrashProduct,
    getListTrash,
    deleteProduct,
    getAllProNotSale,
    createProduct,
    insertDescription,
    getProductBestSeller,
    insertStoreQty,
    updateProduct,
    updateDescription,
    updateStoreQty,
    // updateImage,




}